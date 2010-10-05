//
//  View_SwitcherAppDelegate.h
//  View_Switcher
//
//  Created by John Ragan on 5/31/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SwitchViewController;

@interface View_SwitcherAppDelegate : NSObject <UIApplicationDelegate> {
  IBOutlet UIWindow *window;
  IBOutlet SwitchViewController *switchViewController;
}

@property (nonatomic, retain) UIWindow *window;
@property (nonatomic, retain) SwitchViewController *switchViewController;

@end

