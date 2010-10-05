//
//  SwitchViewController.m
//  View_Switcher
//
//  Created by John Ragan on 5/31/09.
//  Copyright 2009 RollStream. All rights reserved.
//

#import "SwitchViewController.h"
#import "BlueViewController.h"
#import "YellowViewController.h"


@implementation SwitchViewController
@synthesize blueViewController;
@synthesize yellowViewController;

- (void)viewDidLoad
{
  BlueViewController *blueController = [[BlueViewController alloc]
    initWithNibName:@"BlueView" bundle:nil];
  self.blueViewController = blueController;
  [self.view insertSubview:blueController.view atIndex:0];
  [blueController release];
}

- (IBAction) switchViews:(id)sender
{
  if (self.yellowViewController == nil)
  {
    YellowViewController *yellowController =
      [[YellowViewController alloc]
        initWithNibName:@"YellowView"
          bundle:nil];
    self.yellowViewController = yellowController;
    [yellowController release];
  }
  
  [UIView beginAnimations:@"View Flip" context:nil];
  [UIView setAnimationDuration:1.25];
  [UIView setAnimationCurve:UIViewAnimationCurveEaseInOut];
  
  if (self.blueViewController.view.superview == nil)
  {
    [UIView setAnimationTransition:
      UIViewAnimationTransitionFlipFromRight
      forView:self.view cache:YES];
    [blueViewController viewWillAppear:YES];
    [yellowViewController viewWillDisappear:YES];
    [yellowViewController.view removeFromSuperview];
    [self.view insertSubview:self.blueViewController.view atIndex:0];
    [yellowViewController viewDidAppear:YES];
    [blueViewController viewDidAppear:YES];
  }
  else
  {
    [UIView setAnimationTransition:
     UIViewAnimationTransitionFlipFromLeft
                           forView:self.view cache:YES];
    [yellowViewController viewWillAppear:YES];
    [blueViewController viewWillDisappear:YES];
    [blueViewController.view removeFromSuperview];
    [self.view insertSubview:self.yellowViewController.view atIndex:0];
    [blueViewController viewDidAppear:YES];
    [yellowViewController viewDidAppear:YES];
  }
  [UIView commitAnimations];
}

/*
// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}
*/


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
    [yellowViewController release];
    [blueViewController release];
    [super dealloc];
}


@end
