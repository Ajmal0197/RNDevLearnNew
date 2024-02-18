#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

// ALL MODULES/METHODS TO BE EXPOSED TO RN ARE MENTIONED IN "Objective-C" ".m" files
// THIS IS ONLY FOR GETTING DATA TO IOS FROM RN

// Declare the CustomMethods class as a React Native module
// The RCT_EXTERN_MODULE macro exposes Objective-C classes as React Native modules
// CustomMethods is the module name, and NSObject is the superclass
@interface RCT_EXTERN_MODULE(CustomMethods, NSObject)

// Expose the MyMethod method to React Native
// RCT_EXTERN_METHOD macro exposes Objective-C methods as React Native methods
RCT_EXTERN_METHOD(myMethod:(NSString *)param)

@end
