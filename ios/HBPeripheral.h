//
//  HBPeripheral.h
//  NDCHealth
//
//  Created by EthanChou on 2017/9/4.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import <CoreBluetooth/CoreBluetooth.h>

@interface HBPeripheral : NSObject

@property (strong, nonatomic) CBPeripheral *peripherial;
@property (strong, nonatomic) NSString *address;

+ (NSArray *) devicesListToDictionary:(NSArray *)devicesList;

- (id)initWithPeripherial:(CBPeripheral *)peripherial address:(NSString *)address;

-(NSDictionary *)toDictionary;

@end
