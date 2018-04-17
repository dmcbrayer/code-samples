# This is a rack middleware that integrates with the Apartment gem.  We used
# apartment to separate data between our clients in different tenants within
# the database.  With this, we piggyback on Apartment's existing functionality
# that chooses the tenant based on the subdomain, and also switches to a different
# Redis namespace to further isolate data between tenants.
#
#
class Apartment::Elevators::SubdomainWithRedis < Apartment::Elevators::Subdomain
  def call(env)
    super
  rescue Apartment::TenantNotFound
    Apartment::Tenant.reset
    return [
      404,
      { 'Content-Type' => 'text/html' },
      [File.read(Rails.root.to_s + '/public/404.html')]
    ]
  end

  def parse_tenant_name(request)
    request_subdomain = subdomain(request.host)

    # If the domain acquired is set to be excluded, set the tenant to whatever
    # is currently next in line in the schema search path.
    # This is core Apartment behavior.
    #
    # Additionally, this sets the $redis variable to be a namespaced version
    # of our core redis connection that corresponds to the company subdomain.
    tenant = if self.class.excluded_subdomains.include?(request_subdomain)
               $redis = Redis::Namespace.new('public', redis: $redis_core)
               nil
             else
               $redis = Redis::Namespace.new(request_subdomain,
                                             redis: $redis_core)
               request_subdomain
             end

    tenant.presence
  end
end
