//
//  DebugAppDelegate.h
//  Debug
//
//  Created by John Ragan on 5/28/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@class DebugViewController;

@interface DebugAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    DebugViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet DebugViewController *viewController;

@end

