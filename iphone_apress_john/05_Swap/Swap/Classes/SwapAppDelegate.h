//
//  SwapAppDelegate.h
//  Swap
//
//  Created by John Ragan on 5/30/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SwapViewController;

@interface SwapAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    SwapViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet SwapViewController *viewController;

@end

