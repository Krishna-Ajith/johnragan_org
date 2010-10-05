//
//  Button_FunViewController.h
//  Button Fun
//
//  Created by John Ragan on 5/27/09.
//  Copyright RollStream 2009. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface Button_FunViewController : UIViewController {
  IBOutlet UILabel * statusText;
}
@property (retain, nonatomic) UILabel * statusText;

- (IBAction) buttonPressed:(id)sender;
@end

