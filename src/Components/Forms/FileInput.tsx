import React, { ChangeEvent, useMemo, useState } from 'react';
import { FaFile, FaVideo } from 'react-icons/fa';
import { SingleValidationRules } from '../Types/Others';
import { DefaultInputValidate } from '../Hooks/Common/useValidations';

interface Props {
	labelId: string;
	label: string;
	file?: File | FileList | string | null;
	required?: boolean;
	id?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	validationSchema?: SingleValidationRules;
	errors?: string[] | string;
	multiple?: boolean;
}

const FileInput = ({
	labelId,
	label,
	file,
	required = false,
	id,
	onChange,
	validationSchema,
	errors,
	multiple = false,
}: Props) => {
	const [localErrors, setLocalErrors] = useState<string[]>([]);

	const previewItems = useMemo(() => {
		if (!file) return [];
		if (file instanceof FileList) return Array.from(file);
		if (file instanceof File) return [file];
		if (typeof file === 'string') return [file];
		return [];
	}, [file]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		const collectedErrors: string[] = [];

		if (files && validationSchema) {
			for (let i = 0; i < files.length; i++) {
				const error = DefaultInputValidate({
					name: e.target.name,
					value: files[i],
					validationSchema,
				});
				if (error) {
					collectedErrors.push(...error);
				}
			}
		}

		setLocalErrors(collectedErrors);

		if (!collectedErrors.length) {
			onChange?.(e);
		} else {
			e.target.value = '';
		}
	};

	const renderPreview = (f: File | string, index: number) => {
		const key = `${labelId}-${index}`;
		if (typeof f === 'string') {
			const isImage = /\.(png|jpe?g|svg)$/i.test(f);
			return isImage ? (
				<img
					key={key}
					src={import.meta.env.VITE_BASE_URL + f}
					className="rounded-md w-[100px] h-[100px] object-cover"
					alt="uploaded"
				/>
			) : (
				<div key={key} className="text-center">
					<FaFile />
					{f}
				</div>
			);
		}

		if (f.type.startsWith('image/')) {
			return (
				<img
					key={key}
					src={URL.createObjectURL(f)}
					className="rounded-md w-[100px] h-[100px] object-cover"
					alt="uploaded"
				/>
			);
		}
		if (f.type.startsWith('video/')) {
			return (
				<div key={key} className="text-center">
					<FaVideo />
					{f.name}
				</div>
			);
		}
		return (
			<div key={key} className="text-center">
				<FaFile />
				{f.name}
			</div>
		);
	};

	return (
		<div>
			<label
				htmlFor={labelId}
				className="flex flex-col gap-2 bg-primary/10 w-[300px] min-h-[200px] overflow-hidden p-5 relative justify-center items-center hover:bg-primary/30 rounded-md cursor-pointer"
			>
				{previewItems.length ? (
					<div className="flex flex-wrap gap-2 justify-center">
						{previewItems.map((f, i) => renderPreview(f, i))}
					</div>
				) : (
					<>
						<svg width="70" height="71" viewBox="0 0 70 71" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17.5008 53.0031C10.5971 53.0031 5 47.4731 5 40.651C5 33.8289 10.5971 28.296 17.5008 28.296C18.3311 28.298 19.1381 28.3757 19.9217 28.5293M19.9217 28.5293C19.238 26.699 18.8883 24.7607 18.8892 22.8068C18.8892 13.7098 26.35 6.33643 35.555 6.33643C44.13 6.33643 51.1913 12.7356 52.1217 20.9635M19.9217 28.5293C21.5352 28.8435 23.0713 29.4718 24.4425 30.3785M41.1113 20.9985C42.898 20.378 44.7761 20.0615 46.6675 20.0623C48.575 20.0623 50.4096 20.3802 52.1217 20.9635M52.1217 20.9635C58.6433 23.1948 63.3333 29.3227 63.3333 36.5327C63.3333 44.4281 57.7129 51.0285 50.2083 52.6327" stroke="#00A69C" strokeWidth="4" strokeLinecap="round"/>
							<path d="M34.9998 45.5029V63.0029M34.9998 45.5029L40.8332 51.3363M34.9998 45.5029L29.1665 51.3363" stroke="#00A69C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						<div className="text-center text-lg">{label}</div>
					</>
				)}
			</label>

			<input
				type="file"
				id={id || labelId}
				name={labelId}
				onChange={handleChange}
				required={required}
				className="hidden"
				multiple={multiple}
				accept={validationSchema?.file?.allowedExtensions?.join(',')}
			/>

			{[...(typeof errors === 'string' ? [errors] : errors || []), ...localErrors].length > 0 && (
				<div className="mb-3 absolute">
					{[...(typeof errors === 'string' ? [errors] : errors || []), ...localErrors].map((err, i) => (
						<span key={i} className="text-red-500 block">
							{err}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default FileInput;
