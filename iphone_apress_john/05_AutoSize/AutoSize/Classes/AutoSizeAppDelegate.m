//
//  AutoSizeAppDelegate.m
//  AutoSize
//
//  Created by John Ragan on 5/30/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import "AutoSizeAppDelegate.h"
#import "AutoSizeViewController.h"

@implementation AutoSizeAppDelegate

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
