# This class allows us to step through a given Range.  The need here was
# that we needed to generate custom reports for various date ranges, monthly
# weekly, yearly, etc.  This allows us to take a predefined range, define how
# big each step should be, and then pass in a block to do an action.
# 
# Prefer doing this over monkeypatching Range.

# range_class = SteppedDateRange.new(1.week.ago..1.week.from_now)
#
# range_class.time_step(1.week) { |time| puts time }
# 2018-01-01 17:00:58 -0500
# 2018-01-08 17:00:58 -0500
# 2018-01-15 17:00:58 -0500
# #=> nil
class SteppedDateRange
  def initialize(range)
    @range = range
  end

  attr_reader :range

  def time_step(step)
    return enum_for(:time_step, step) unless block_given?

    start_time = range.first
    end_time = range.last

    loop do
      # yield to the block
      yield start_time

      # take the time step.
      break unless (start_time += step) <= end_time
    end
  end
end
