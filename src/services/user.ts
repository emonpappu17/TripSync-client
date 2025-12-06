/* eslint-disable @typescript-eslint/no-explicit-any */
// export async function updateUserProfile(id: string, _prevState: any, formData: FormData) {
//     const experienceValue = formData.get("experience");
//     const appointmentFeeValue = formData.get("appointmentFee");


//     const validationPayload: Partial<IDoctor> = {
//         name: formData.get("name") as string,
//         contactNumber: formData.get("contactNumber") as string,
//         address: formData.get("address") as string,
//         registrationNumber: formData.get("registrationNumber") as string,
//         experience: experienceValue ? Number(experienceValue) : 0,
//         gender: formData.get("gender") as "MALE" | "FEMALE",
//         appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
//         qualification: formData.get("qualification") as string,
//         currentWorkingPlace: formData.get("currentWorkingPlace") as string,
//         designation: formData.get("designation") as string,
//     };

//     // Parse specialties array (for adding new specialties)
//     const specialtiesValue = formData.get("specialties") as string;
//     if (specialtiesValue) {
//         try {
//             const parsed = JSON.parse(specialtiesValue);
//             if (Array.isArray(parsed) && parsed.length > 0) {
//                 validationPayload.specialties = parsed;
//             }
//         } catch {
//             // Ignore invalid JSON
//         }
//     }

//     // Parse removeSpecialties array (for removing existing specialties)
//     const removeSpecialtiesValue = formData.get("removeSpecialties") as string;
//     if (removeSpecialtiesValue) {
//         try {
//             const parsed = JSON.parse(removeSpecialtiesValue);
//             if (Array.isArray(parsed) && parsed.length > 0) {
//                 validationPayload.removeSpecialties = parsed;
//             }
//         } catch {
//             // Ignore invalid JSON
//         }
//     };

//     const validatedPayload = zodValidator(validationPayload, updateDoctorZodSchema);

//     if (!validatedPayload.success && validatedPayload.errors) {
//         return {
//             success: validatedPayload.success,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: validatedPayload.errors,
//         }
//     }

//     if (!validatedPayload.data) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//         }
//     }

//     try {
//         const response = await serverFetch.patch(`/doctor/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(validatedPayload.data),
//         })
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
//             formData: validationPayload,
//         }
//     }
// }
