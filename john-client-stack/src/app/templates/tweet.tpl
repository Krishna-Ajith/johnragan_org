<article class="tweet">
	<img class="tweet-img" src="{{ profile_image_url }}" />
	<span class="tweet-user">
	    <a href="https://twitter.com/#!/{{ from_user }}" target="_blank">@{{ from_user }}</a>
	</span>
	<p class="tweet-text">{{markup text }}</p>
	<time datetime="{{created_at}}" class="tweet-date">{{dateFormatter created_at}}</time>
</article>