import { MessageCode } from '@shared/enums/message-code';

export interface MessageData {
  code: MessageCode;
  [key: string]: any;
}
