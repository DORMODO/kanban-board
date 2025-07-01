import clsx from "clsx";

/**
 * TextField component for rendering an input field with validation.
 * @param {Object} props - Props for the TextField component.
 * @param {string} props.placeholder - Placeholder text for the input field.
 *  @param {boolean} props.isInvalid - Flag to indicate if the input is invalid.
 *  @param {string} props.name - Name attribute for the input field.
 *  @param {boolean} props.required - Flag to indicate if the input is required.
 *   @param {string} props.defaultValue - Default value for the input field.
 * @returns {JSX.Element}
 */

const TextField = ({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}) => {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="text-body-l text-red absolute right-4">
          Can't be empty
        </span>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "border-medium-grey/25 text-body-l w-full rounded-[4px] border py-2 pl-4",
          {
            "border-red pr-32": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
};

export default TextField;
