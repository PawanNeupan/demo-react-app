import { useState } from "react" 

import { useForm, useFieldArray } from "react-hook-form"
// useForm: built-in hook that manages form state, validation, and submission
// useFieldArray: built-in hook to manage dynamic array fields (add/remove multiple inputs)

import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod" 

const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required"), 
  role: z.string().min(1, "Role is required")                
})

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),         
  companies: z.array(companySchema).min(1, "At least one company is required")
  
})

// ---------------------------
// 2️⃣ TypeScript type from schema
// ---------------------------
type UserFormData = z.infer<typeof userSchema>
// z.infer automatically converts schema to TypeScript type
// Now UserFormData has { name: string, companies: { companyName: string, role: string }[] }

// ---------------------------
// 3️⃣ Component
// ---------------------------
const CreateUserForm = () => {

  // ---------------------------
  // 3a️⃣ Local state for submitted users
  // ---------------------------
  const [users, setUsers] = useState<UserFormData[]>([])
  // stores all users submitted via the form

  // ---------------------------
  // 3b️⃣ Setup useForm
  // ---------------------------
  const { 
    register,        // connects input element to form state (tracks value & validation)
    control,         // required by useFieldArray to manage array fields
    handleSubmit,    // function that validates form and then calls onSubmit
    formState: { errors }, // object that stores validation errors automatically
    reset,           // resets form to default values
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema), // connects Zod schema validation
    defaultValues: {
      name: "",                       // initial value for name input
      companies: [{ companyName: "", role: "" }] // initial array with one empty company
    }
  })

  // ---------------------------
  // 3c️⃣ Setup useFieldArray
  // ---------------------------
  const { fields, append, remove } = useFieldArray({
    control,   // connect to useForm
    name: "companies", // which array field to manage
  })
  // fields → current array items (each has built-in id for key)
  // append → built-in function to add a new company
  // remove → built-in function to remove a company by index

  // ---------------------------
  // 3d️⃣ Form submit handler
  // ---------------------------
  const onSubmit = (data: UserFormData) => {
    setUsers([...users, data]) 
    reset()                  
  }

  // ---------------------------
  // 4️⃣ Render form and users list
  // ---------------------------
  return (
    <div className="p-6 space-y-6">

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded space-y-4">
        <h2 className="text-xl font-bold">Create User</h2>

        {/* User Name */}
        <div>
          <label>Name</label>
          <input
            {...register("name")} // built-in: track value & validation for name
            className="border p-2 w-full"
            placeholder="Enter user name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          {/* built-in: errors object contains validation messages automatically */}
        </div>

        {/* Dynamic Companies */}
        <div>
          <h3 className="font-semibold">Previous Companies</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="border p-3 mb-2 rounded space-y-2">

              {/* Company Name */}
              <input
                {...register(`companies.${index}.companyName`)}
                placeholder="Company name"
                className="border p-2 w-full"
              />
              {errors.companies?.[index]?.companyName &&
                <p className="text-red-500 text-sm">{errors.companies[index]?.companyName?.message}</p>
              }

              {/* Role */}
              <input
                {...register(`companies.${index}.role`)}
                placeholder="Role"
                className="border p-2 w-full"
              />
              {errors.companies?.[index]?.role &&
                <p className="text-red-500 text-sm">{errors.companies[index]?.role?.message}</p>
              }

              {/* Remove company button */}
              <button type="button" className="text-red-600" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          {/* Display array-level error */}
          {errors.companies?.message && <p className="text-red-500 text-sm">{errors.companies.message}</p>}

          {/* Add company button */}
          <button type="button" className="text-blue-600" onClick={() => append({ companyName: "", role: "" })}>
            Add Company
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>

      {/* USERS LIST */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold">Users</h2>
        {users.map((user, i) => (
          <div key={i} className="border p-2 mb-2 rounded">
            <b>Name:</b> {user.name}
            <div>
              <b>Companies:</b>
              {user.companies.map((c, j) => (
                <div key={j}>{c.companyName} — {c.role}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CreateUserForm
