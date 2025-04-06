import React, { useState } from "react";

const Input = ({ type = "text", placeholder, value, onChange }) => (
  <input className="block mb-2 p-2 border rounded w-full" type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

const Button = ({ onClick, children, color }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded text-white ${color}`}>{children}</button>
);

const UserDetails = ({ formData, setFormData, nextStep }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Step 1: User Details</h2>
    <Input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
    <Input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
    <Button onClick={nextStep} color="bg-blue-500">Next</Button>
  </div>
);

const AddressDetails = ({ formData, setFormData, nextStep, prevStep }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Step 2: Address Details</h2>
    <Input placeholder="Street" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
    <Input placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
    <Input placeholder="Zip Code" value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })} />
    <div className="flex justify-between">
      <Button onClick={prevStep} color="bg-gray-500">Back</Button>
      <Button onClick={nextStep} color="bg-blue-500">Next</Button>
    </div>
  </div>
);

const Confirmation = ({ formData, prevStep, submitForm }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Step 3: Confirmation</h2>
    <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(formData, null, 2)}</pre>
    <div className="flex justify-between">
      <Button onClick={prevStep} color="bg-gray-500">Back</Button>
      <Button onClick={submitForm} color="bg-green-500">Submit</Button>
    </div>
  </div>
);

const ProgressBar = ({ step }) => (
  <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
  </div>
);

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", street: "", city: "", zipCode: "" });
  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const submitForm = () => alert("Form submitted successfully!\n" + JSON.stringify(formData, null, 2));

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <ProgressBar step={step} />
      {step === 1 && <UserDetails formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <AddressDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Confirmation formData={formData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
}
