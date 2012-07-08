#load 'deploy' if respond_to?(:namespace) # cap2 differentiator

#Dir['vendor/gems/*/recipes/*.rb','vendor/plugins/*/recipes/*.rb'].
#  each { |plugin| load(plugin) }

#load 'config/deploy' # remove this line to skip loading any of the default

set :user, 'jragan'
domain = 'wdwescort.com'
set :application, 'depot'
#set :copy_cache, "/tmp/deploy-cache/myproject"

#set :default_environment, { 
#  'PATH' => "/home/ragan/.rvm/bin:$PATH",
#  'GEM_HOME' => '/home/jragan/.rvm/gems/ruby-1.9.3-p194@rails3cap/gems',
#  'GEM_PATH' => '/home/jragan/.rvm/gems/ruby-1.9.3-p194@rails3cap/gems' 
#}

default_run_options[:pty] = true

# adjust if you are using RVM, remove if you are not
#$:.unshift(File.expand_path('./lib', ENV['rvm_path']))
set :rvm_ruby_string, 'ruby-1.9.3-p194@rails3cap'
set :rvm_type, :user
#require "capistrano"
require 'rvm/capistrano'



# file paths
set :repository, "#{user}@#{domain}:git/#{application}.git"
set :deploy_to, "/home/#{user}/#{application}"

set :deploy_via, :remote_cache
set :scm, :git
set :branch, 'master'
set :scm_verbose, true
set :use_sudo, false
set :rails_env, :test

role :web, domain                          # Your HTTP server, Apache/etc
role :app, domain                          # This may be the same as your `Web` server
role :db,  domain, :primary => true # This is where Rails migrations will run

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end

after "deploy:update_code", :bundle_install
desc "install the necessary prerequisites"
task :bundle_install, :roles => :app do
  run "cd #{release_path} && bundle install"
end
