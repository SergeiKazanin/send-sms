import axios from "axios";
import { Messages, SendSms, SendSmsResp, SmsId } from "../models/models";

export async function smsSend(smsData: SendSms) {
  const resp = {
    isError: false,
    isLoading: false,
    data: {} as SendSmsResp,
  };
  try {
    resp.isLoading = true;
    const { data } = await axios<SendSmsResp>({
      method: "post",
      url: `${process.env.REACT_APP_API_SENDSMS}`,
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
      data: {
        ...smsData,
      },
    });
    resp.data = data;
    resp.isLoading = false;
    resp.isError = false;
  } catch (error) {
    resp.isError = true;
    resp.isLoading = false;
  }
  return resp;
}
export async function getSmsById(smsData: SmsId) {
  const resp = {
    isError: false,
    isLoading: false,
    data: {} as Messages,
  };
  try {
    resp.isLoading = true;
    const { data } = await axios<Messages>({
      method: "post",
      url: `${process.env.REACT_APP_API_GETLIST}`,
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
      data: {
        ...smsData,
      },
    });
    resp.data = data;
    resp.isLoading = false;
    resp.isError = false;
  } catch (error) {
    resp.isError = true;
    resp.isLoading = false;
  }
  return resp;
}
