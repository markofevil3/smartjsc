set :application, "Smartjsc"
set :user, "ec2-user"
set :runner, user
# set :repository, "svn+ssh://root@118.70.129.253/svn/alley_labs/SolitaireRush/trunk"
set :deploy_to, "/home/ec2-user/www/#{application}"
# set :revision, ENV['revision'] if ENV['revision']
# set :keep_releases, 5
set :use_sudo, true
ssh_options[:keys] = ["#{ENV['HOME']}/.ssh/bpquanpublic.pem"]

set :smartjsc_server, "ec2-175-41-185-47.ap-southeast-1.compute.amazonaws.com"
role :app, smartjsc_server

namespace :smartjsc do
  after "smartjsc:update", "smartjsc:restart"

  task :update, :roles => :app do
    run "cd #{current_path}; git pull"
  end

  task :start, :roles => :app do
    run "cd #{current_path}; mongod --dbpath ~/mongodb/data >> #{shared_path}/production.log 2>&1 &"
    # run "cd #{current_path}; sudo NODE_ENV=production node app.js >> #{shared_path}/production.log 2>&1 &"
    run "cd #{current_path}; ./start.sh"
  end

  task :stop, :roles => :app do
    # run "cd #{current_path}; chmod a+x stop.sh; ./stop.sh >> #{shared_path}/log/production.log 2>&1 &"
    run "cd #{current_path}; sudo pkill node >> #{shared_path}/production.log 2>&1 &"
  end

  task :restart, :roles => :app do
    transaction do
      stop
      start
    end
  end
end
