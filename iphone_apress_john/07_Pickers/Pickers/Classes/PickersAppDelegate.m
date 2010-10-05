//
//  PickersAppDelegate.m
//  Pickers
//
//  Created by John Ragan on 5/31/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import "PickersAppDelegate.h"

@implementation PickersAppDelegate

@synthesize window;
@synthesize rootController;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    

    // Override point for customization after application launch
    [window addSubview:rootController.view];
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [rootController release];
    [window release];
    [super dealloc];
}


@end
