"use client";

function ActionButton(props: {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  tipo: "primary" | "secondary";
  title: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      disabled={props.disabled}
      className={`${props.className || ""} ${
        props.tipo === "primary"
          ? "bg-celeste text-white bg-celeste-hover"
          : "bg-amarillo text-black bg-amarillo-hover"
      } px-5 py-2 rounded-full font-semibold transition-colors duration-200 ease-in-out ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {props.title}
    </button>
  );
}

export default ActionButton;
