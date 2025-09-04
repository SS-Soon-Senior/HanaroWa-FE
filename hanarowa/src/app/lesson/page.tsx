import { Layout, Header, LessonContent } from '@components';

const Page = () => {
  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <LessonContent />
    </Layout>
  );
};

export default Page;
