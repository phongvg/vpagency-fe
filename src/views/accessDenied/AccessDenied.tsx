import { Container, DoubleSidedImage } from '@/components/shared'

export default function AccessDenied() {
  return (
    <Container className="h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <DoubleSidedImage
          src="/img/others/img-2.png"
          darkModeSrc="/img/others/img-2-dark.png"
          alt="Access Denied!"
        />
        <div className="mt-6 text-center">
          <h3 className="mb-2">Bạn không có quyền!</h3>
          <p className="text-base">Bạn không có quyền truy cập trang này</p>
        </div>
      </div>
    </Container>
  )
}
