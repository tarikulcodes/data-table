import { cn } from '@/lib/utils';

const SectionHeader = ({
    title,
    description,
    actions,
    className,
}: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn('mb-2 flex flex-row justify-between gap-2', className)}>
            <div className="grid grid-cols-1 gap-1">
                <h2 className="text-2xl font-bold">{title}</h2>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
            <div className="flex flex-row gap-2">{actions}</div>
        </div>
    );
};

export default SectionHeader;
