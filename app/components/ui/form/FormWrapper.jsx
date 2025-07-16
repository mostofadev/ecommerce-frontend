// components/ui/FormWrapper.jsx

export default function FormWrapper({OnClass=true, onSubmit, children, className = "",title="" }) {
    return (
      <form
        onSubmit={onSubmit}
        className={` bg-white p-8 ${OnClass? "shadow-lg rounded-xl": ""} space-y-6 ${className}`}
      >
       {title &&
       <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">{title}</h2>
       }
        
        {children}
      </form>
    );
  }
  