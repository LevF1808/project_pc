from django import forms

class PSUCalculatorForm(forms.Form):
    widget_attrs = {
        'class': 'form-input-custom',
    }

    cpu_power = forms.IntegerField(
        label="TDP Процессора (Вт)",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 65'})
    )
    gpu_power = forms.IntegerField(
        label="TDP Видеокарты (Вт)",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 200'})
    )
    fans_count = forms.IntegerField(
        label="Кол-во вентиляторов",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': '3'})
    )
    storage_count = forms.IntegerField(
        label="Кол-во дисков",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': '1'})
    )

    safety_margin = forms.ChoiceField(
        label="Приоритеты системы",
        choices=[(1, 'Тишина'), (2, 'Максимальный запас')],
        widget=forms.Select(attrs=widget_attrs)
    )

    upgrade = forms.ChoiceField(
        label="Планируется апгрейд?",
        choices=[('yes', 'Да'), ('no', 'Нет')],
        widget=forms.Select(attrs=widget_attrs)
    )


class CPUchooseForm(forms.Form):
    widget_attrs = {
        'class': 'form-input-custom',
    }

    brend = forms.ChoiceField(
        label="intel или amd?",
        choices=[(1, 'intel'), (2, 'amd')],
        widget=forms.Select(attrs={'class': 'form-input-custom', 'id': 'brend'})
    )

    kernels = forms.IntegerField(
        label="Количество ядер",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 6'})
    )

    frequency = forms.IntegerField(
        label="Тактовая частота",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 3 (ГГц)'})
    )

    streams = forms.IntegerField(
        label="Количество потоков",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 12'})
    )

    works = forms.ChoiceField(
        label="Для какого ПК?",
        choices=[(1, 'игровой'), (2, 'офисный')],
        widget=forms.Select(attrs=widget_attrs)
    )

    soket = forms.ChoiceField(
        label="Сокет",
        choices=[
            (1, 'LGA 1700'), (2, 'LGA 1851'), (3, 'LGA 1200'), (4, 'AM5'), (5, 'AM4')
        ],
        widget=forms.Select(attrs={'class': 'form-input-custom', 'id': 'soket'})
    )


class GPUchooseForm(forms.Form):
    widget_attrs = {
        'class': 'form-input-custom',
    }

    brend_2 = forms.ChoiceField(
        label="NVIDIA или amd?",
        choices=[(1, 'NVIDIA'), (2, 'amd')],
        widget=forms.Select(attrs=widget_attrs)
    )

    memory = forms.IntegerField(
        label="Количество видеопамяти",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 6 (Гб)'})
    )

    frequency_2 = forms.IntegerField(
        label="Тактовая частота",
        widget=forms.NumberInput(attrs={**widget_attrs, 'placeholder': 'Напр: 3 (ГГц)'})
    )

    resolution = forms.ChoiceField(
        label="Разрешение монитора",
        choices=[(1, 'Full HD'), (2, 'QHD'), (3, 'Ultra HD')],
        widget=forms.Select(attrs=widget_attrs)
    )

    works_2 = forms.ChoiceField(
        label="Для какого ПК?",
        choices=[(1, 'игровой'), (2, 'офисный'),  (3, 'для ИИ')],
        widget=forms.Select(attrs=widget_attrs)
    )

    port = forms.ChoiceField(
        label="Порт",
        choices=[
            (1, 'PCIe 5.0'), (2, 'PCIe 4.0'), (3, 'PCIe 3.0'), (4, 'PCIe 2.0')
        ],
        widget=forms.Select(attrs=widget_attrs)
    )
