//
//  View_SwitcherAppDelegate.m
//  View_Switcher
//
//  Created by John Ragan on 5/31/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import "View_SwitcherAppDelegate.h"
#import "SwitchViewController.h"

@implementation View_SwitcherAppDelegate

@synthesize window;
@synthesize switchViewController;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    

    // Override point for customization after application launch
    [window addSubview:switchViewController.view];
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [window release];
    [switchViewController release];
    [super dealloc];
}


@end
