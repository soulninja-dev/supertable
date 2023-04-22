import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import { authOptions } from "~/server/auth";
import { useTableStore } from "~/stores/tableStore";
import { api } from "~/utils/api";
import { useFormStore } from "~/stores/formStore";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";

const FormBuilder = dynamic(() => import("~/components/FormBuilder"), {
  ssr: false,
});

const TablePage: NextPage<{ baseId: string; tableId: string }> = ({
  baseId,
  tableId,
}) => {
  const router = useRouter();
  const [setTable, setLoading] = useTableStore((state) => [
    state.setTable,
    state.setLoading,
  ]);

  const {
    data: tableRes,
    refetch,
    isInitialLoading,
  } = api.table.getTable.useQuery({ tableId });
  const [currentForm] = useFormStore((state) => [state.form]);

  useEffect(() => {
    if (tableRes) {
      setTable(tableRes);
      setLoading(false);
    }
  }, [tableRes]);

  return (
    <div className="h-screen">
      <Head>
        <title>Supertable | Form</title>
      </Head>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="grid grid-cols-5 gap-4">
          <Sidebar page="settings" />
          <main className="h-[calc(100vh-268px)] flex-1 col-span-4">
            <FormBuilder />
            {/* {!currentForm.id && !isInitialLoading && (
              <div className="flex h-2/3 w-full items-center justify-center">
                {"No forms available :("}
              </div>
            )}
            {isInitialLoading && (
              <div className="flex h-2/3 w-full items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-6 w-6 animate-spin text-[#a09c9b]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-100"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-50"
                    fill="#000"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )} */}
          </main>
        </div>
      </div>
    </div>
  );
};

// const Sidebar: React.FC<{ refetchTable: () => Promise<any> }> = ({
//   refetchTable,
// }) => {
//   const router = useRouter();
//   const [table] = useTableStore((state) => [state.table]);
//   const [setForm] = useFormStore((state) => [state.setForm]);
//   // const { data: forms, refetch: refetchForms } = api.form.getForms.useQuery({
//   //   tableId: router.query.tableId as string,
//   // });
//   const { mutateAsync } = api.form.createForm.useMutation();
//   const { data: currentForm, mutateAsync: fetchCurrentForm } =
//     api.form.getForm.useMutation();

//   const handleCreateForm = async () => {
//     const res = await mutateAsync({
//       tableId: router.query.tableId as string,
//       baseId: router.query.baseId as string,
//       title: "Untitled Form",
//       description: "No description",
//     });
//     await refetchTable();
//     handleSelectForm(res.id);
//   };

//   const handleSelectForm = async (formId: string) => {
//     const currentForm = await fetchCurrentForm({ formId });
//     setForm(currentForm);
//     // add query param formid to url
//     router.push(
//       `/dashboard/${router.query.baseId}/${router.query.tableId}?formId=${formId}`,
//       undefined,
//       { shallow: true }
//     );
//   };

//   useEffect(() => {
//     if (!currentForm) {
//       if (router.query.formId) {
//         handleSelectForm(router.query.formId as string);
//       } else if (table.forms && table.forms[0]) {
//         console.log(table);
//         handleSelectForm(table.forms[0].id);
//       }
//     }
//   }, [router.query, table]);

//   return (
//     <div className="flex h-full w-64 flex-col items-center justify-between bg-sidebar">
//       <div className="flex h-20 w-full flex-col justify-start px-4 pt-10">
//         <Link
//           className="flex cursor-pointer items-center text-lg font-semibold"
//           href="/dashboard"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="black"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-chevron-right rotate-180"
//           >
//             <polyline points="9 18 15 12 9 6"></polyline>
//           </svg>
//           {table.name}
//         </Link>
//         <div className="mt-10 flex flex-col items-start gap-y-5">
//           <button
//             className="flex w-full flex-row items-center justify-center gap-2 rounded bg-black py-2 px-4 font-semibold text-white outline-none transition duration-200 ease-in-out hover:bg-black/60 focus:bg-black/60"
//             onClick={handleCreateForm}
//           >
//             <Image src="/plus.svg" height={20} width={20} alt="plus sign" className="invert" />
//             Create Form
//           </button>
//           {table &&
//             table.forms?.map((form) => (
//               <button
//                 className={`flex w-full items-center gap-x-2 rounded-lg py-2 px-4 transition-colors duration-100 ease-in-out hover:bg-black/10 font-medium
//                 ${currentForm?.id === form.id ? "bg-black/10" : ""}
//               `}
//                 key={form.id}
//                 onClick={() => handleSelectForm(form.id)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="feather feather-table"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"></path>
//                 </svg>
//                 {form.title}
//               </button>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export const getServerSideProps: GetServerSideProps<{
  baseId: string;
  tableId: string;
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Return query params baseId and tableId

  return {
    props: {
      baseId: context.query.baseId as string,
      tableId: context.query.tableId as string,
    },
  };
};

export default TablePage;
