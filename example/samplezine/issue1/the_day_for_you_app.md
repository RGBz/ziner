@author: rgbz
@title: The "Day For You" App

# The "Day For You" App
Every year, for the last few years I've made a special app for my wife's birthday. Some years it's a [React Native](https://reactnative.dev/) app, some years it's a web app and most recently it was a straight-up native iOS app.

While she's sleeping I install it on her phone (or for the web app, I texted her a link to it).

This app is very simple. When you first open it there are 6 locks with times listed underneath.

During the day, the locks turn into presents when the listed time arrives. Tapping on the present "opens" it to reveal usually a picture and a message describing some gift.

Most of the gifts are meals or a "card". But the gifts at the end of the day are the best ones.

For her, the app is a lot of fun. It's exciting to have your birthday last all day long with fun presents that fit in your pocket.

Every year she tells me I should make it so other people can do the same thing. Every year I start on it and then get distracted.

Maybe not this year!

## Making a day for someone
The basic idea for a more general app would be to allow people to create "days" for their friends and family by downloading the app, adding the timed "gifts" which when opened reval photos and messages.

This year I figured I could use the birthday app as an excuse to learn [Swift](https://swift.org/) and [Swift UI](https://developer.apple.com/xcode/swiftui/). It took a few days to learn Swift and Swift UI enough to make it, but I succeeded.

The next step is to make it more general purpose. The current plan is to charge a dollar or two to let people make and send "days" to their friends.

The app would let you create, send and accept "days". When you make a day, it'll be uploaded to a server and you'll be given a code to send to the recipient to accept the "day".

## How it's going
So far I have a basic UI for sending and receiving. I'm focusing on mobile first so I'm planning to build out most of the iOS app before getting started on the server part of it (which should be pretty basic anyway).

My goal is to have a working app before my sister in law's birthday on Nov. 15th. However I'm not sure I'll have it available on the app story by then, but it's a good goal. I should be working on it today, but instead I'm making this magazine.