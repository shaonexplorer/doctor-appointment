"use client";

import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";

function CustomPhoneInput({ ...field }) {
  return (
    <label className="flex flex-col gap-y-[8px]">
      <span className="text-[#ABB8C4] font-medium text-[14px]">
        Phone number
      </span>
      <PhoneInputWithCountrySelect
        className="input-phone"
        value={field.value}
        onChange={field.onChange}
        international="true"
        defaultCountry="US"
      />
    </label>
  );
}

export default CustomPhoneInput;
