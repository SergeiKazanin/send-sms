export interface SendSms {
  number: string;
  destination: string;
  text: string;
}

export interface SendSmsResp {
  message_id: string;
}

export interface SmsId {
  message_id: string;
}

export interface Messages {
  messages: Message[];
}

export interface Message {
  message_id: string;
  application_uuid: string;
  date: string;
  number: string;
  sender: string;
  receiver: string;
  text: string;
  direction: number;
  segments_count: number;
  billing_status: number;
  delivery_status: number;
  channel: number;
  status: number;
}
