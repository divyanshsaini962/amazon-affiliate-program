import dynamic from 'next/dynamic';

const TiptapEditorClient = dynamic(() => import('./TiptapEditorClient'), { ssr: false });

export default TiptapEditorClient;


