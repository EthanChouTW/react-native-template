//
//  POSPrinting.h
//  PrinterLibs
//
//  Created by EthanChou on 2017/9/14.
//  Copyright © 2017年 EthanChou. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "IO.h"
#import <UIKit/UIKit.h>

@interface POSPrinting : NSObject


- (instancetype) init;

/**
 * 读写方式和打印指令分离，给该类设置一个io即可实现打印。
 */
- (void) SetIO:(IO *) io;

- (IO *) GetIO;

- (void) POS_PrintPicture:(UIImage *)mImage x:(int)x nWidth:(int)nWidth nHeight:(int)nHeight nBinaryAlgorithm:(int)nBinaryAlgorithm nCompressMethod:(int)nCompressMethod;

- (void) POS_Reset;

- (void) POS_SetPrintSpeed:(int)nSpeed;

@end
