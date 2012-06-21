require 'mongo'

DB = Mongo::Connection.new.db('example', :pool_size => 5, :timeout => 5);

attractions = DB.collection('attractions')

space_mountain = { 
  :list_item_photo_url => "data/images/mk/attractions/space-mountain-240.jpeg",
	:name => "Space Mountain",
	:summary => "Launch past the flashing lights of your space station into the soaring darkness of space! This classic Dark Ride dips and swerves as it rockets through the blackest reaches of the galaxy. Check the monitors as you exit for a glimpse of yourself in flight!",
	:rating => 9,
	:wait => "Busy",
	:intensity => 8,
	:height => "44",
	:FP => "FP",
	:pal_mickey => "Pal Mickey",
	:rider_swap => "Rider Swap",
	:wheelchair => "Wheelchair"
}
space_mountain_id = attractions.insert(space_mountain)

philharmagic = { 
  :list_item_photo_url => "data/images/mk/attractions/AL_PHILH_240.jpeg",
	:name => "Mickey's Philharmagic",
	:summary => "In this dazzling and innovative 3D movie, Mickey Mouse and Donald Duck sweep you into the scenes from classic Disney films as Donald chases the Sorcerer's hat that starts all the trouble!",
	:rating => 7,
	:wait => "Idle",
	:intensity => 3,
	:FP => "FP",
	:pal_mickey => "Pal Mickey",
	:wheelchair => "Wheelchair"
}
philharmagic_id = attractions.insert(philharmagic)

#note = notes.find( :id => note_id ).first
#note[:text] = 'Remember the bread'
#notes.update({ :_id => note_id }, note)
#notes.update({ :_id => note_id }, '$set' => { :text = > 'Remember the bread' }) 

