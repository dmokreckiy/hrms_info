set :application, "app_project"
set :repository,  ""
set :deploy_to, "/home/alex/ruby/app_project"
set :scm, :git
set :branch, "master"
set :user, "bill"
set :group, "deployers"
set :use_sudo, false
set :rails_env, "production"
set :deploy_via, :copy
set :ssh_options, { :forward_agent => true, :port => 4321 }
set :keep_releases, 5
default_run_options[:pty] = true

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "178.159.246.87"                          # Your HTTP server, Apache/etc
role :app, "178.159.246.87"                          # This may be the same as your `Web` server
role :db,  "178.159.246.87", :primary => true # This is where Rails migrations will run
role :db,  "178.159.246.87"

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