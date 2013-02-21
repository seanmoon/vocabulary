require 'rake'

task :test do
  require 'cutest'

  ENV['TEST'] = "1"
  Cutest.run(Dir["test/**/*.rb"])
end

task default: :test
