//
//  CustomMethods.swift

// WRITE ALL CODES LOGICS HERE THAT IS TO BE USED IN RN

//  the Swift code is structured to define a React Native module with a method that can be called from JavaScript code. The @objc annotations and inheritance from NSObject ensure interoperability with Objective-C, which is necessary for integration with React Native.

import Foundation

@objc(CustomMethods) class CustomMethods: NSObject{
   
  @objc static func requiresMainQueueSetup() -> Bool {
      return true // Set to true if setup on the main thread is required
  } //true(when sending some constants to ios/making UI using UIKit in ios)/false run this module on main thread b4 any JS code executes
  
  @objc public func myMethod(_ param:String){
    print(param)
    
    RNEventEmitter.emitter.sendEvent(withName: "onReady", body: [param]) // send to RN from IOS "onReady" type
  }
}
