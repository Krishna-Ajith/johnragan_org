//
//  DebugAppDelegate.m
//  Debug
//
//  Created by John Ragan on 5/28/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import "DebugAppDelegate.h"
#import "DebugViewController.h"

@implementation DebugAppDelegate

@synthesize window;
@synthesize viewController;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
    
    // Override point for customization after app launch    
    [window addSubview:viewController.view];
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [viewController release];
    [window release];
    [super dealloc];
}


@end
