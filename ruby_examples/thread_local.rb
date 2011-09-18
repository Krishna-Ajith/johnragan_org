def current_user
     Thread.current[:user] = "foo"
     bar = Thread.current[:user]
     puts bar
end

current_user