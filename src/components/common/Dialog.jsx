import * as dialog from "@radix-ui/react-dialog";

/**
 * DialogPrimitive component
 * @param {Object} props
 * @param {string} props.title - The title of the dialog
 * @param {JSX.Element} props.triggerComponent - The component that triggers the dialog
 * @param {JSX.Element} props.children - The children components
 * @param {boolean} props.isOpen - A boolean to determine if the dialog is open
 * @param {Function} props.setOpen - A function to set the dialog state
 * @returns {JSX.Element}
 */
const Dialog = ({
  title,
  triggerComponent,
  children,
  isOpen,
  setOpen,
}) => {
  return (
    <dialog.Root open={isOpen} onOpenChange={setOpen}>
      <dialog.Trigger asChild>{triggerComponent}</dialog.Trigger>
      <dialog.Portal>
        <dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[480px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-8 focus:outline-none">
          <dialog.Title className="text-heading-l">{title}</dialog.Title>
          {children}
        </dialog.Content>
      </dialog.Portal>
    </dialog.Root>
  );
};

export default Dialog;