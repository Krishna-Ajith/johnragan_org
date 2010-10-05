//
//  SwitchViewController.h
//  View_Switcher
//
//  Created by John Ragan on 5/31/09.
//  Copyright 2009 RollStream. All rights reserved.
//

#import <UIKit/UIKit.h>

@class BlueViewController;
@class YellowViewController;


@interface SwitchViewController : UIViewController {
  YellowViewController *yellowViewController;
  BlueViewController *blueViewController;
}
@property (retain, nonatomic) YellowViewController *yellowViewController;
@property (retain, nonatomic) BlueViewController *blueViewController;

- (IBAction) switchViews:(id)sender;

@end
