//
//  LabelPrinting.h
//  PrinterLibs
//
//  Created by EthanChou on 2017/9/14.
//  Copyright © 2017年 EthanChou. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "IO.h"
@interface LabelPrinting : NSObject


- (instancetype) init;

- (void) SetIO:(IO *) io;


@end
