//
//  RNEventEmitter.swift

import React

@objc(RNEventEmitter)
open class RNEventEmitter:RCTEventEmitter{
  
  public static var emitter: RCTEventEmitter! // global variable
  
  // constructor
  override init(){
    super.init()
    RNEventEmitter.emitter = self
  }
  
  open override func supportedEvents() -> [String] {
    ["onReady", "onPending", "onFailure"]  // etc.
  }
}
