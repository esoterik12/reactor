import InlineError from "@/components/shared/InlineError";
import PageContainer from "@/components/containers/PageContainer";

const UnauthorizedPage = () => {
  return (
    <PageContainer customClasses="px-4 py-2">
      <InlineError classes="">
        <p>Only avaiable to internal users.</p>
        <p>You are not authorized to view this page.</p>
      </InlineError>
    </PageContainer>
  );
};

export default UnauthorizedPage;
