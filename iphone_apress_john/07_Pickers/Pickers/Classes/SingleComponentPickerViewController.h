//
//  SingleComponentPickerViewController.h
//  Pickers
//
//  Created by John Ragan on 5/31/09.
//  Copyright 2009 RollStream. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface SingleComponentPickerViewController : UIViewController <UIPickerViewDelegate, UIPickerViewDataSource>
{
  IBOutlet UIPickerView *singlePicker;
  NSArray *pickerData;
}
@property (nonatomic, retain) UIPickerView *singlePicker;
@property (nonatomic, retain) NSArray *pickerData;
- (IBAction)buttonPressed;
@end
