//
//  AutoSizeAppDelegate.h
//  AutoSize
//
//  Created by John Ragan on 5/30/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@class AutoSizeViewController;

@interface AutoSizeAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    AutoSizeViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet AutoSizeViewController *viewController;

@end

