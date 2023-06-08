// @generated by protoc-gen-es v1.2.0 with parameter "target=ts"
// @generated from file mission/v1/mission.proto (package mission.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum mission.v1.Termination
 */
export enum Termination {
  /**
   * @generated from enum value: TERMINATION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TERMINATION_AUTO = 1;
   */
  AUTO = 1,

  /**
   * @generated from enum value: TERMINATION_STD = 2;
   */
  STD = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Termination)
proto3.util.setEnumType(Termination, "mission.v1.Termination", [
  { no: 0, name: "TERMINATION_UNSPECIFIED" },
  { no: 1, name: "TERMINATION_AUTO" },
  { no: 2, name: "TERMINATION_STD" },
]);

/**
 * @generated from enum mission.v1.Action
 */
export enum Action {
  /**
   * @generated from enum value: ACTION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ACTION_TAKEOFF = 1;
   */
  TAKEOFF = 1,

  /**
   * @generated from enum value: ACTION_DISARM = 2;
   */
  DISARM = 2,

  /**
   * @generated from enum value: ACTION_SELFCHECK = 3;
   */
  SELFCHECK = 3,

  /**
   * @generated from enum value: ACTION_RELEASE = 4;
   */
  RELEASE = 4,

  /**
   * @generated from enum value: ACTION_RTLHOME = 5;
   */
  RTLHOME = 5,

  /**
   * @generated from enum value: ACTION_HOLD = 6;
   */
  HOLD = 6,

  /**
   * @generated from enum value: ACTION_AUTOLAND = 7;
   */
  AUTOLAND = 7,
}
// Retrieve enum metadata with: proto3.getEnumType(Action)
proto3.util.setEnumType(Action, "mission.v1.Action", [
  { no: 0, name: "ACTION_UNSPECIFIED" },
  { no: 1, name: "ACTION_TAKEOFF" },
  { no: 2, name: "ACTION_DISARM" },
  { no: 3, name: "ACTION_SELFCHECK" },
  { no: 4, name: "ACTION_RELEASE" },
  { no: 5, name: "ACTION_RTLHOME" },
  { no: 6, name: "ACTION_HOLD" },
  { no: 7, name: "ACTION_AUTOLAND" },
]);

/**
 * @generated from enum mission.v1.Planner
 */
export enum Planner {
  /**
   * @generated from enum value: PLANNER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PLANNER_EGO = 1;
   */
  EGO = 1,

  /**
   * @generated from enum value: PLANNER_FAST = 2;
   */
  FAST = 2,

  /**
   * @generated from enum value: PLANNER_MARKER = 3;
   */
  MARKER = 3,

  /**
   * @generated from enum value: PLANNER_SAFELAND = 4;
   */
  SAFELAND = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(Planner)
proto3.util.setEnumType(Planner, "mission.v1.Planner", [
  { no: 0, name: "PLANNER_UNSPECIFIED" },
  { no: 1, name: "PLANNER_EGO" },
  { no: 2, name: "PLANNER_FAST" },
  { no: 3, name: "PLANNER_MARKER" },
  { no: 4, name: "PLANNER_SAFELAND" },
]);

/**
 * @generated from enum mission.v1.Controller
 */
export enum Controller {
  /**
   * @generated from enum value: CONTROLLER_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: CONTROLLER_PX4_VELO_FB = 1;
   */
  PX4_VELO_FB = 1,

  /**
   * @generated from enum value: CONTROLLER_A_FB = 2;
   */
  A_FB = 2,

  /**
   * @generated from enum value: CONTROLLER_A_FW = 3;
   */
  A_FW = 3,

  /**
   * @generated from enum value: CONTROLLER_A_ADRJ = 4;
   */
  A_ADRJ = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(Controller)
proto3.util.setEnumType(Controller, "mission.v1.Controller", [
  { no: 0, name: "CONTROLLER_UNSPECIFIED" },
  { no: 1, name: "CONTROLLER_PX4_VELO_FB" },
  { no: 2, name: "CONTROLLER_A_FB" },
  { no: 3, name: "CONTROLLER_A_FW" },
  { no: 4, name: "CONTROLLER_A_ADRJ" },
]);

/**
 * @generated from message mission.v1.vector3
 */
export class vector3 extends Message<vector3> {
  /**
   * @generated from field: repeated double vector = 1;
   */
  vector: number[] = [];

  constructor(data?: PartialMessage<vector3>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.vector3";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "vector", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): vector3 {
    return new vector3().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): vector3 {
    return new vector3().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): vector3 {
    return new vector3().fromJsonString(jsonString, options);
  }

  static equals(a: vector3 | PlainMessage<vector3> | undefined, b: vector3 | PlainMessage<vector3> | undefined): boolean {
    return proto3.util.equals(vector3, a, b);
  }
}

/**
 * @generated from message mission.v1.InitInstruction
 */
export class InitInstruction extends Message<InitInstruction> {
  /**
   * Define a repeated field of integers for the peripheral devices.
   *
   * @generated from field: repeated int32 peripheral = 1;
   */
  peripheral: number[] = [];

  /**
   * Define a string field for the controller.
   *
   * @generated from field: mission.v1.Controller controller = 2;
   */
  controller = Controller.UNSPECIFIED;

  /**
   * Define a string field for the standard.
   *
   * @generated from field: mission.v1.Termination terminate = 3;
   */
  terminate = Termination.UNSPECIFIED;

  constructor(data?: PartialMessage<InitInstruction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.InitInstruction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "peripheral", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 2, name: "controller", kind: "enum", T: proto3.getEnumType(Controller) },
    { no: 3, name: "terminate", kind: "enum", T: proto3.getEnumType(Termination) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): InitInstruction {
    return new InitInstruction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): InitInstruction {
    return new InitInstruction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): InitInstruction {
    return new InitInstruction().fromJsonString(jsonString, options);
  }

  static equals(a: InitInstruction | PlainMessage<InitInstruction> | undefined, b: InitInstruction | PlainMessage<InitInstruction> | undefined): boolean {
    return proto3.util.equals(InitInstruction, a, b);
  }
}

/**
 * Define the message for the TRAVEL instruction.
 *
 * @generated from message mission.v1.TravelInstruction
 */
export class TravelInstruction extends Message<TravelInstruction> {
  /**
   * Define a float field for the distance.
   *
   * @generated from field: mission.v1.Planner planner = 1;
   */
  planner = Planner.UNSPECIFIED;

  /**
   * @generated from field: repeated mission.v1.vector3 waypoint = 2;
   */
  waypoint: vector3[] = [];

  /**
   * @generated from field: repeated mission.v1.vector3 constraint = 3;
   */
  constraint: vector3[] = [];

  /**
   * Define a string field for the standard. 
   *
   * @generated from field: mission.v1.Termination terminate = 4;
   */
  terminate = Termination.UNSPECIFIED;

  constructor(data?: PartialMessage<TravelInstruction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.TravelInstruction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "planner", kind: "enum", T: proto3.getEnumType(Planner) },
    { no: 2, name: "waypoint", kind: "message", T: vector3, repeated: true },
    { no: 3, name: "constraint", kind: "message", T: vector3, repeated: true },
    { no: 4, name: "terminate", kind: "enum", T: proto3.getEnumType(Termination) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TravelInstruction {
    return new TravelInstruction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TravelInstruction {
    return new TravelInstruction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TravelInstruction {
    return new TravelInstruction().fromJsonString(jsonString, options);
  }

  static equals(a: TravelInstruction | PlainMessage<TravelInstruction> | undefined, b: TravelInstruction | PlainMessage<TravelInstruction> | undefined): boolean {
    return proto3.util.equals(TravelInstruction, a, b);
  }
}

/**
 * Define the message for the ACTION instruction.
 *
 * @generated from message mission.v1.ActionInstruction
 */
export class ActionInstruction extends Message<ActionInstruction> {
  /**
   * Define a string field for the action type.
   *
   * @generated from field: mission.v1.Action action = 1;
   */
  action = Action.UNSPECIFIED;

  /**
   * This field is optionals only for release command. If it is not populated, the default value is 0.
   *
   * @generated from field: repeated int32 package = 2;
   */
  package: number[] = [];

  /**
   * For takoff, land. Optional. If not populated, the default value is 0.
   *
   * @generated from field: double param = 3;
   */
  param = 0;

  constructor(data?: PartialMessage<ActionInstruction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.ActionInstruction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "action", kind: "enum", T: proto3.getEnumType(Action) },
    { no: 2, name: "package", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 3, name: "param", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ActionInstruction {
    return new ActionInstruction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ActionInstruction {
    return new ActionInstruction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ActionInstruction {
    return new ActionInstruction().fromJsonString(jsonString, options);
  }

  static equals(a: ActionInstruction | PlainMessage<ActionInstruction> | undefined, b: ActionInstruction | PlainMessage<ActionInstruction> | undefined): boolean {
    return proto3.util.equals(ActionInstruction, a, b);
  }
}

/**
 * @generated from message mission.v1.SequenceItem
 */
export class SequenceItem extends Message<SequenceItem> {
  /**
   * @generated from oneof mission.v1.SequenceItem.sequence
   */
  sequence: {
    /**
     * @generated from field: mission.v1.InitInstruction init_sequence = 1;
     */
    value: InitInstruction;
    case: "initSequence";
  } | {
    /**
     * @generated from field: mission.v1.ActionInstruction action_sequence = 2;
     */
    value: ActionInstruction;
    case: "actionSequence";
  } | {
    /**
     * @generated from field: mission.v1.TravelInstruction travel_sequence = 3;
     */
    value: TravelInstruction;
    case: "travelSequence";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<SequenceItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.SequenceItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "init_sequence", kind: "message", T: InitInstruction, oneof: "sequence" },
    { no: 2, name: "action_sequence", kind: "message", T: ActionInstruction, oneof: "sequence" },
    { no: 3, name: "travel_sequence", kind: "message", T: TravelInstruction, oneof: "sequence" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SequenceItem {
    return new SequenceItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SequenceItem {
    return new SequenceItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SequenceItem {
    return new SequenceItem().fromJsonString(jsonString, options);
  }

  static equals(a: SequenceItem | PlainMessage<SequenceItem> | undefined, b: SequenceItem | PlainMessage<SequenceItem> | undefined): boolean {
    return proto3.util.equals(SequenceItem, a, b);
  }
}

/**
 * @generated from message mission.v1.SendMissionRequest
 */
export class SendMissionRequest extends Message<SendMissionRequest> {
  /**
   * Define a unique ID for the mission.
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: int32 length = 2;
   */
  length = 0;

  /**
   * @generated from field: int32 package_id = 3;
   */
  packageId = 0;

  /**
   * @generated from field: int32 drone_id = 4;
   */
  droneId = 0;

  /**
   * @generated from field: string description = 5;
   */
  description = "";

  /**
   * @generated from field: repeated mission.v1.SequenceItem sequence_items = 6;
   */
  sequenceItems: SequenceItem[] = [];

  constructor(data?: PartialMessage<SendMissionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.SendMissionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "length", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "package_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "drone_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "sequence_items", kind: "message", T: SequenceItem, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendMissionRequest {
    return new SendMissionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendMissionRequest {
    return new SendMissionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendMissionRequest {
    return new SendMissionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SendMissionRequest | PlainMessage<SendMissionRequest> | undefined, b: SendMissionRequest | PlainMessage<SendMissionRequest> | undefined): boolean {
    return proto3.util.equals(SendMissionRequest, a, b);
  }
}

/**
 * For later use. Sending single instruction only
 *
 * @generated from message mission.v1.SingleInstruction
 */
export class SingleInstruction extends Message<SingleInstruction> {
  /**
   * @generated from field: mission.v1.SequenceItem sequence_item = 1;
   */
  sequenceItem?: SequenceItem;

  constructor(data?: PartialMessage<SingleInstruction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.SingleInstruction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "sequence_item", kind: "message", T: SequenceItem },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SingleInstruction {
    return new SingleInstruction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SingleInstruction {
    return new SingleInstruction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SingleInstruction {
    return new SingleInstruction().fromJsonString(jsonString, options);
  }

  static equals(a: SingleInstruction | PlainMessage<SingleInstruction> | undefined, b: SingleInstruction | PlainMessage<SingleInstruction> | undefined): boolean {
    return proto3.util.equals(SingleInstruction, a, b);
  }
}

/**
 * @generated from message mission.v1.SendMissionResponse
 */
export class SendMissionResponse extends Message<SendMissionResponse> {
  /**
   * Define a boolean field to indicate success or failure.
   *
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string message = 2;
   */
  message = "";

  /**
   * Define a string field for any error messages.
   *
   * @generated from field: string error_message = 3;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<SendMissionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "mission.v1.SendMissionResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "error_message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendMissionResponse {
    return new SendMissionResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendMissionResponse {
    return new SendMissionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendMissionResponse {
    return new SendMissionResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SendMissionResponse | PlainMessage<SendMissionResponse> | undefined, b: SendMissionResponse | PlainMessage<SendMissionResponse> | undefined): boolean {
    return proto3.util.equals(SendMissionResponse, a, b);
  }
}

