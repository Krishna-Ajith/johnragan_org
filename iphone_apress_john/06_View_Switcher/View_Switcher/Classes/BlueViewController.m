//
//  BlueViewController.m
//  View_Switcher
//
//  Created by John Ragan on 5/31/09.
//  Copyright 2009 RollStream. All rights reserved.
//

#import "BlueViewController.h"


@implementation BlueViewController

- (IBAction)blueButtonPressed:(id)sender
{
  UIAlertView *alert = [[UIAlertView alloc]
    initWithTitle:@"Blue View Button Pressed" 
    message:@"You pressed the button on the blue view" 
    delegate:nil 
    cancelButtonTitle:@"Yep, I did." 
    otherButtonTitles:nil];
  [alert show];
  [alert release];
}


// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}


/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/

/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}
*/

// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning]; // Releases the view if it doesn't have a superview
    // Release anything that's not essential, such as cached data
}


- (void)dealloc {
    [super dealloc];
}


@end
