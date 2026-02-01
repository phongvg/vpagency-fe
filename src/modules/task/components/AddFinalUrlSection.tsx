import { useFinalUrlsByProjectId } from "@/modules/finalUrl/hooks/useFinalUrlsByProjectId";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useFormContext, useWatch } from "react-hook-form";

export default function AddFinalUrlSection() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const projectId = useWatch({
    control,
    name: "projectId",
  });

  const selectedFinalUrlIds: string[] = useWatch({
    control,
    name: "finalUrlIds",
    defaultValue: [],
  });

  const { data: finalUrls } = useFinalUrlsByProjectId(projectId.value);

  const toggleFinalUrl = (id: string, checked: boolean) => {
    if (checked) {
      setValue("finalUrlIds", [...selectedFinalUrlIds, id], {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue(
        "finalUrlIds",
        selectedFinalUrlIds.filter((item) => item !== id),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }
  };

  return (
    <div className='col-span-3'>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách URL</CardTitle>
        </CardHeader>

        <CardContent className='p-0'>
          {finalUrls && finalUrls.length > 0 ? (
            <table className='w-full align-middle'>
              <thead>
                <tr>
                  <th className='px-2 py-2 w-[40px] font-semibold text-white text-center'></th>
                  <th className='px-2 py-2 font-semibold text-white text-left'>Tên</th>
                  <th className='px-2 py-2 w-[250px] font-semibold text-white text-left'>URL</th>
                </tr>
              </thead>

              <tbody>
                {finalUrls.map((url) => (
                  <tr key={url.id} className='border-t'>
                    <td className='px-2 py-4 w-[40px]'>
                      <div className='flex justify-center items-center'>
                        <Checkbox checked={selectedFinalUrlIds.includes(url.id)} onCheckedChange={(checked) => toggleFinalUrl(url.id, !!checked)} />
                      </div>
                    </td>

                    <td className='px-2 py-4'>{url.name}</td>

                    <td className='px-2 py-4 max-w-[250px] text-blue-500 truncate' title={url.finalURL}>
                      <a
                        href={url.finalURL}
                        className='hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                        onClick={(e) => e.stopPropagation()}>
                        {url.finalURL}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='py-4 text-white text-center'>Không có URL nào trong dự án này.</p>
          )}
        </CardContent>
      </Card>

      {errors.finalUrlIds && <p className='mt-2 text-red-500 text-sm'>{errors.finalUrlIds.message as string}</p>}
    </div>
  );
}
