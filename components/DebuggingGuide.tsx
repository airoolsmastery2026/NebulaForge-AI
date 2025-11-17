import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from './common/Card';
import { useI18n } from '../hooks/useI18n';

const Section: React.FC<{ titleKey: string; children: React.ReactNode; }> = ({ titleKey, children }) => {
    const { t } = useI18n();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t(titleKey)}</CardTitle>
            </CardHeader>
            <div className="p-4 prose prose-sm sm:prose-base prose-invert max-w-none prose-pre:bg-gray-800/50 prose-pre:text-gray-200 prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-table:w-full prose-th:p-2 prose-th:text-left prose-th:bg-gray-800/50 prose-td:p-2 prose-td:border-t prose-td:border-gray-700">
                {children}
            </div>
        </Card>
    );
};

const CodeBlock: React.FC<{ language: string; children: string; }> = ({ language, children }) => (
    <pre><code className={`language-${language}`}>{children.trim()}</code></pre>
);

const vercelErrors = Array.from({ length: 20 }, (_, i) => `err${i + 1}`);

export const DebuggingGuide: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-3xl">{t('debuggingGuide.title')}</CardTitle>
                    <CardDescription>{t('debuggingGuide.description')}</CardDescription>
                </CardHeader>
            </Card>

            <Section titleKey="debuggingGuide.stepByStepTitle">
                <h4>{t('debuggingGuide.step1_title')}</h4>
                <p>{t('debuggingGuide.step1_desc')}</p>
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step1_tip1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step1_tip2') }} />
                </ul>

                <h4 className="mt-4">{t('debuggingGuide.step2_title')}</h4>
                <p>{t('debuggingGuide.step2_desc')}</p>
                 <ul>
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step2_tip1') }} />
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step2_tip2') }} />
                </ul>
                
                <h4 className="mt-4">{t('debuggingGuide.step3_title')}</h4>
                <p>{t('debuggingGuide.step3_desc')}</p>
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step3_tip1') }} />
                </ul>

                <h4 className="mt-4">{t('debuggingGuide.step4_title')}</h4>
                 <p>{t('debuggingGuide.step4_desc')}</p>
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t('debuggingGuide.step4_tip1') }} />
                </ul>
            </Section>

            <Section titleKey="debuggingGuide.quickFixesTitle">
                <h5>{t('debuggingGuide.build_command_title')}</h5>
                <p>{t('debuggingGuide.build_command_desc')}</p>
                <CodeBlock language="bash">npm run build</CodeBlock>
                
                <h5 className="mt-4">{t('debuggingGuide.fallback_ui_title')}</h5>
                <p>{t('debuggingGuide.fallback_ui_desc')}</p>
                 <CodeBlock language="jsx">{`
import { ErrorBoundary } from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MyAppComponent />
    </ErrorBoundary>
  );
}
                 `}</CodeBlock>
            </Section>

            <Section titleKey="debuggingGuide.vercelErrorsTitle">
                <table>
                    <thead>
                        <tr>
                            <th>{t('debuggingGuide.error')}</th>
                            <th>{t('debuggingGuide.cause')}</th>
                            <th>{t('debuggingGuide.fix')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vercelErrors.map(errKey => (
                            <tr key={errKey}>
                                <td><strong>{t(`debuggingGuide.${errKey}_title`)}</strong></td>
                                <td>{t(`debuggingGuide.${errKey}_cause`)}</td>
                                <td>{t(`debuggingGuide.${errKey}_fix`)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Section>
        </div>
    );
};