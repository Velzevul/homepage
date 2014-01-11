require 'sinatra'

projects = {
  'teevy' => {
    :template => :teevy,
    :title => "Teevy Application"
  },

  'studytube-cms' => {
    :template => :"st-cms",
    :title => "Studytube CMS"
  },

  'studytube-website' => {
    :template => :"st-website",
    :title => "Studytube Website"
  },


  'model-agency-website' => {
    :template => :"model-agency",
    :title => "Model Agency Website"
  }
}

get '/' do
  @title = "Portfolio of Volodymyr Dziubak"
  erb :index, :layout => :wrap
end

get '/project/:project' do |p|
  project = projects[p]
  pass unless project
  @title = project[:title]
  erb project[:template], :layout => :wrap
end

not_found do
  @title = "Page not found..."
  erb :error404, :layout => :wrap
end