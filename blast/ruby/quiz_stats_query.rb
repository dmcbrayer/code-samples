# frozen_string_literal: true

# For a while, we were attempting to do these calculations
# with a combination of ActiveRecord queries and pure ruby.
# This is much faster.
#
# One of the drawbacks from using raw SQL here is that we don't
# have access to the entire Quiz object like we normally do when we
# get it from ActiveRecord because we didn't get all of its information
# out of the database.  So treat this like a limited duck type of a Quiz.
# We can more or less treat it like a quiz, except it only has the methods
# that are specifically specified in the select statement of the SQL query.
#
# > QuizStatsQuery.call(
#     company: Company.first,
#     start_time: 1.week.ago,
#     end_time: 1.day.ago
#   )
#
# #=> [#<Quiz 0x00000001>, #<Quiz 0x0000002>, ...]
#
class QuizStatsQuery
  # params object should look like the following:
  #
  #   params = {
  #     company: Company.first,
  #     start_time: 1.month.ago,
  #     end_time: Time.current
  #   }
  #
  # In other words, the :company param should be a company
  # object, and start_time and end_time should both be DateTime
  # objects or something similar.
  def self.call(params = {})
    subdomain = params[:company].subdomain

    # Quote these values to help protect against sql
    # injection attacks
    conn = ActiveRecord::Base.connection
    start_time = conn.quote(params[:start_time])
    end_time = conn.quote(params[:end_time])

    Quiz.find_by_sql(%{
      select  users.id,
              count(*) as completed_quizzes,
              sum(quizzes.time) as time,
              sum(quizzes.points) as points, 
              sum(quizzes.number_correct) as correct_questions,
              sum(a.total_questions) as total_questions,
              cast(coalesce(sum(quizzes.number_correct) / sum(a.total_questions), 0) as decimal(10,2)) as accuracy,
              cast(avg(quizzes.time) as decimal(10,0)) as average_time
      from #{subdomain}.users
        inner join #{subdomain}.quizzes quizzes on users.id = quizzes.user_id
        inner join (
          select quiz_id, count(*) as total_questions
          from #{subdomain}.quiz_questions
          group by quiz_id
        ) a on quizzes.id = a.quiz_id
      where quizzes.end_time is not null
      and quizzes.points is not null
      and quizzes.start_time between #{start_time} and #{end_time}
      group by users.id
      order by points desc;
    })
  end
end
