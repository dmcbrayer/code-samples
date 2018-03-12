# frozen_string_literal: true

# This class exists to filter users by a series of attributes
# so they can be placed into groups.
#
# This is an exclusive filter in that the returned records
# must match all of the conditions specified in the params, e.g.,
# if you pass in { locations: "atlanta, ga", departments: ["it"] }
# the service will only return users that are in the IT department
# in Atlanta.
#
# Its implementation is found in app/controllers/admin/groups_controller.rb
#
# Inspiration found here:
# http://www.justinweiss.com/articles/search-and-filter-rails-models-without-bloating-your-controller/
#
# > UserFilter.new(locations: ["atlanta, ga"]).call
# #=> #<ActiveRecord::Relation> containing all of the matching User records
class UserFilter
  # opts object should look like the following:
  #
  #   opts = {
  #     locations: ["atlanta, ga"],
  #     departments: ["front desk", "it"],
  #     levels: ["manager"],
  #     groups: ["Test Group"]
  #   }
  #
  # All of these keys are not required, and they can
  # also be empty without breaking the whole thing.
  #
  def initialize(opts = {})
    @options = whitelisted_options(opts)
    @results = User.unexpired
  end

  attr_reader :options, :results

  # Get an aggregated result of the various scopes
  # that are passed in.
  def call
    methods_to_chain
      .compact
      .reduce(results) { |o, a| o.send(*a) }
  end

  private

  # Construct an array of method names and arguments to create
  # a chain of scope arguments that can be passed as a group
  # to the preceding User scope.
  def methods_to_chain
    options.map do |key, value|
      next unless value.present?
      key == :groups ? [:in_groups_named, value] : [key, value]
    end
  end

  def whitelisted_options(opts)
    opts.slice(:departments, :groups, :locations, :levels)
  end
end
