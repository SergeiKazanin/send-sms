import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { smsSend, getSmsById } from "./api/apiSms";
import { useState } from "react";
import { Messages, SmsId } from "./models/models";
function App() {
  const [message_id, setMessage_id] = useState<SmsId>();
  const [isErrorMessageSend, setIsErrorMessageSend] = useState(false);
  const [isErrorCheckStatus, setIsErrorCheckStatus] = useState(false);
  const [checkStatus, setCheckStatus] = useState<Messages>();
  const deliveryStatus = [
    "",
    "Cообщение ожидает отправки в SMS-центр",
    "Cообщение отправлено в SMS-центр",
    "Cообщение доставлено получателю",
    "Cообщение не может быть доставлено получателю",
    "Превышено количество попыток отправки сообщения",
    "Прием и отправка сообщений заблокированы",
  ];
  return (
    <div className="bg-stone-400 flex flex-col h-screen w-screen gap-4 items-center justify-center">
      <Formik
        initialValues={{
          destination: "",
          text: "",
        }}
        validationSchema={Yup.object({
          destination: Yup.string()
            .min(11, "Короткий номер")
            .max(11, "Длинный номер")
            .required("Обязательтное поле"),
          text: Yup.string()
            .max(1600, "Слишком много символов")
            .required("Обязательное поле"),
        })}
        onSubmit={async (values) => {
          const smsData = {
            ...values,
            number: `${process.env.REACT_APP_API_NUMBER}`,
          };
          setCheckStatus({} as Messages);
          const { data, isError, isLoading } = await smsSend(smsData);
          if (!isLoading && !isError) {
            setMessage_id(data);
            setIsErrorMessageSend(false);
          } else {
            setMessage_id({} as SmsId);
            setIsErrorMessageSend(true);
          }
        }}
      >
        {() => (
          <Form className="flex flex-col gap-4 items-center justify-center">
            <Field
              className="h-9 w-80 p-1 placeholder-black relative outline-none rounded-md shadow-md"
              name="destination"
              type="text"
              placeholder="Введите номер получателя"
            />
            <ErrorMessage name="destination" />
            <Field
              className="h-32 w-80 p-1 placeholder-black relative outline-none rounded-md shadow-md"
              name="text"
              type="textarea"
              as="textarea"
              placeholder="Ведите текст сообщения"
            />
            <ErrorMessage name="text" />

            <button
              className="bg-teal-200 w-80 h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
              type="submit"
            >
              Отправить сообщение
            </button>
          </Form>
        )}
      </Formik>
      {isErrorMessageSend && <p>Ошибка</p>}
      {message_id?.message_id?.length ? (
        <div className=" w-80 flex flex-col gap-4">
          <button
            onClick={async () => {
              const { data, isError, isLoading } = await getSmsById(message_id);
              if (!isError && !isLoading) {
                setCheckStatus(data);
                setIsErrorCheckStatus(false);
              } else {
                setCheckStatus({} as Messages);
                setIsErrorCheckStatus(true);
              }
            }}
            className="bg-teal-200 w-80 h-14 rounded-md flex items-center justify-center hover:bg-teal-400 text-xl shadow-md"
          >
            Проверить статус отправки сообщения
          </button>
          {isErrorCheckStatus && <p>Ошибка</p>}
          {checkStatus?.messages?.length ? (
            <span>
              {deliveryStatus[checkStatus?.messages[0].delivery_status]}
            </span>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
